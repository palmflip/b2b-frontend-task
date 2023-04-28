import express, { Request, Response } from "express";
import tickets from "../mocks/tickets.json";

const app = express();

app.use(function (req, res, next) {
  if (Math.random() * 100 < 10) {
    res.status(500).send();
    return;
  }

  next();
});

const PORT = process.env.PORT || 3000;

const currentChunkIndex: { [SID: string]: number } = {};

app.get("/search", (req: Request, res: Response) => {
  const searchId = Math.random().toString(36).substring(2, 8);
  currentChunkIndex[searchId] = 0;
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

  const chunkSize = Math.floor(Math.random() * 5) + 1;
  const startIndex = currentChunkIndex[searchId] * chunkSize;
  const endIndex = startIndex + chunkSize;
  const chunk = tickets.slice(startIndex, endIndex);
  currentChunkIndex[searchId]++;

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
