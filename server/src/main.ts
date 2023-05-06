import express, { Request, Response } from "express";
import tickets from "../mocks/tickets.json";

const app = express();

app.use(express.static('../frontend/dist'))

app.use(function (req, res, next) {
  if (Math.random() * 100 < 10) {
    res.status(500).send();
    return;
  }

  next();
});

const PORT = process.env.PORT || 3000;

const currentChunkIndex: { [SID: string]: { currStart: number, prevEndIndex: number } } = {};

app.get("/search", (req: Request, res: Response) => {
  const searchId = Math.random().toString(36).substring(2, 8);
  currentChunkIndex[searchId] = {
    prevEndIndex: -Infinity,
    currStart: 0,
  }
  res.send({ searchId });
});

app.get("/tickets", (req: Request, res: Response) => {
  const { searchId } = req.query;

  if (
    !searchId ||
    typeof searchId !== "string" ||
    currentChunkIndex[searchId] === undefined
  ) {
    res.status(400).send();
    return;
  }

  // Note: мне кажется хранить обрабатыватxь дубликаты в коллекции на клиенте такое себе, поэтому фиксшу тут)
  // Проблема в том, что в следующей итерации новый startIndex может оказаться меньше прошлого endIndex, из-за чего летят дубликаты
  // Плюс ко всему если фильтровать это на клиенте, то может так получиться, что все новые данные оказались дубликатами и необходима делать повторный запрос
  // Но вместе с тем, у нас так же увеличился на currentChunkIndex[searchId]++ и следующий запрос может отдать так же пустой ответ с stop: true
  const chunkSize = Math.floor(Math.random() * 5) + 1;
  let startIndex = currentChunkIndex[searchId].currStart * chunkSize;
  if (startIndex < currentChunkIndex[searchId].prevEndIndex) startIndex = currentChunkIndex[searchId].prevEndIndex;
  const endIndex = startIndex + chunkSize;
  const chunk = tickets.slice(startIndex, endIndex);
  currentChunkIndex[searchId].currStart++;
  currentChunkIndex[searchId].prevEndIndex = endIndex

  if (endIndex >= tickets.length) {
    res.send({ tickets: chunk, stop: true });
    delete currentChunkIndex[searchId];
  } else {
    res.send({ tickets: chunk, stop: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
