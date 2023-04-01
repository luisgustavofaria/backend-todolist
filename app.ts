import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/todo/list-many', async (req, res) => {
  const todo = await prisma.todo.findMany();

  return res.status(200).json(todo);
});

app.post('/todo/create', async (req, res) => {
  const { titleTodoList, textAreaTodoList, isFavorited, color } = req.body;
  console.log(req.body);

  const todo = await prisma.todo.create({
    data: {
      titleTodoList,
      textAreaTodoList,
      isFavorited,
      color,
    },
  });

  return res.status(201).json(todo);
});

app.put('/todo/update-unique', async (req, res) => {
  const { todo_id, titleTodoList, textAreaTodoList, isFavorited, color } =
    req.body;
  if (!todo_id) {
    return res.status(400).json({
      error: 'Todo ID no exist ',
    });
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(todo_id),
    },
  });

  if (!todo) {
    return res.status(400).json({
      error: 'Todo does not exist.',
    });
  }

  function validate(data: any, savedOnDatabase: any) {
    if (data !== null || data !== undefined) {
      return data;
    }

    return savedOnDatabase;
  }

  const todoToUpdateData = {
    titleTodoList: validate(titleTodoList, todo.titleTodoList),
    textAreaTodoList: validate(textAreaTodoList, todo.textAreaTodoList),
    isFavorited: validate(isFavorited, todo.isFavorited),
    color: validate(color, todo.color),
  };
  console.log(todoToUpdateData);

  const todoUpdated = await prisma.todo.update({
    where: {
      id: Number(todo_id),
    },
    data: todoToUpdateData,
  });

  return res.status(201).json(todoUpdated);
});

app.get('/todo/list-unique', async (req, res) => {
  const { todo_id } = req.query as any;
  if (!todo_id) {
    return res.status(400).json({
      error: 'Todo ID no exist ',
    });
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(todo_id),
    },
  });

  if (!todo) {
    return res.status(400).json({
      error: 'Todo  does not exist.',
    });
  }

  return res.status(200).json(todo);
});

app.delete('/todo/delete-unique', async (req, res) => {
  const { todo_id } = req.query as any;
  if (!todo_id) {
    return res.status(400).json({
      error: 'Todo ID no exist ',
    });
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(todo_id),
    },
  });

  if (!todo) {
    return res.status(400).json({
      error: 'Todo does not exist.',
    });
  }

  await prisma.todo.delete({
    where: {
      id: Number(todo_id),
    },
  });

  return res.status(200).json(todo);
});

app.listen(3333, () => {
  console.log('Example app listening on port 3333!');
});
