const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());


const projects = [];


app.get('/projects',(request, response) => {
     const {title} = request.query;
     const results = title
     ? projects.filter(project => project.title.includes(title))
     : projects;
    // console.log(title);
    // console.log(owner);

    return response.json(results);
        // 'Projeto 1',
        // 'Projeto 2',
    // ]);
});

app.post('/projects',(request, response) => {
    // const body = request.body
    // console.log(body);
    const {title, owner} = request.body;
    const project = { id: uuidv4(),title, owner };
    projects.push(project);
    return response.json(project);

    //     'Projeto 1',
    //     'Projeto 2',
    //     'Projeto 3'
    // ]);
});

app.put('/projects/:id',(request, response) => {

    const {id} = request.params;
    const {title, owner} = request.body;
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error: 'Project not found'})
    }

     const project = {
         id,
         title,
         owner,
     };
     projects[projectIndex] = project;
     return response.json(project);

    console.log(id);
    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.delete('/projects/:id',(request, response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({error: 'Project not found'})
    }

    projects.splice(projectIndex,1);
    return response.status(204).send();

    return response.json([
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.listen(3333,()=>{
    console.log('🚀 Back-end started!');
});