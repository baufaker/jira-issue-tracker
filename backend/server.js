let express = require('express');
const fetch = require("node-fetch");
const JiraClient = require("jira-connector");
const authData = require("./environment/auth")

let app = express();

let PORT = 8443;
let jira = new JiraClient({
    host: "softwarenews.atlassian.net",
    basic_auth: authData
  });

  app.use((req, res, next) => {
    // Deixando claro quais domínios podem acessar o resultado da API (no caso, todos)
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Deixando claro quais operações (fornecidas no header da requisição) podem ser realizadas para acessar o resultado da API
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // Deixando claro quais métodos HTTP podem ser usados neste servidor
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    // chama o próximo middleware
    next();
  });

app.get('/', function(req, res) {
    let resultArray = [];
    let urlQuery = `project = ${req.query.proj} AND status changed to FINALIZADO during (\"${req.query.startDate}\", \"${req.query.endDate}\")`;
    // let urlQuery = `project = ${req.query.proj} AND status changed to FINALIZADO`;

    console.log('chegou: ', req.query);
    jira.search.search({
        jql: urlQuery
    }, (error, result)  => {
        console.log('enviou query: ', urlQuery);
        console.log('recebeu resposta: ', result);
        if(result === null){
          console.log("Jira retornou null");
          res.status(400).send({message: "bad request. Jira returned null"});
        }
        if(error){
          console.log("Deu erro na requisição do jira: ", error);
          res.status(503).send({message: "error caught"});
        }
        result.issues.forEach(issue => {
            resultArray.push({
                key: issue.key,
                summary: issue.fields.summary,
                assignee: {
                    name: issue.fields.assignee ? issue.fields.assignee.displayName : null,
                    URL: issue.fields.assignee ? issue.fields.assignee.self : null
                },
                project: issue.fields.project.key
            });
        });
        // console.log(resultArray);
        res.status(200).json(resultArray);
    });
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});