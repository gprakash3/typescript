import {Router} from 'express';
import {Todo} from '../models/todo';

type requestBody = {text:string};
type requestParam = { todoId: string};

let todos:Todo[] = [];

const router = Router();

router.get('/', (req,res,next) => {
    res.status(200).json({todos:todos});
});

router.post('/todo', (req,res,next) => {
    const body = req.body as requestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({message: 'Added ToDo'})
});

router.put('/todo/:todoId', (req,res,next) => {
    const params = req.params as requestParam;
    const tid = params.todoId;
    const body = req.body as requestBody;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if(todoIndex >=0)
    {
        todos[todoIndex] = {id: todos[todoIndex].id , text: body.text};
        return res.status(201).json({message:'updated ToDo', todos:todos});
    }
    else{
        res.status(404).json({message: 'could not find todo for this id'});
    }
});

router.delete('/todo/:todoId', (req,res,next) => {
    const params = req.params as requestParam;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if(todoIndex <0){
        res.status(404).json({message: 'could not find todo for this id'});
    }
    todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
    res.status(200).json({message: 'Deleted todo', todos:todos});
});

export default router;
