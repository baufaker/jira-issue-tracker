// var JiraClient = require('jira-connector');

// var jira = new JiraClient({
//     host: "softwarenews.atlassian.net",
//     basic_auth: {
//       email: "guilhermebaufaker@snews.tv    ",
//       api_token: ""
//     }
//   });

let collaborators = [
        {
            name: "Leandro Leal",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=557058:929d6b50-bff3-4868-b36c-defd14bc681b"
        },
        {
            name: "Wallacy Freitas",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=557058:b903b33e-c1ac-4aef-be34-1bae2ccf4dea"
        },
        {
            name: "Robson Ferreira",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5a05966189ccc1443f114c1c"
        },
        {
            name: "Marcos Assis",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5cd06c614326200dc971d997"
        },
        {
            name: "Alan Farias",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5d49b88eaf16f20ceaf53f73"
        },
        {
            name: "Gabriel Lima",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5c092741ec71bd223bbe83ae"
        },
        {
            name: "Felipe Melo",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=557058:e8035ffb-a2f5-4303-b9a0-29b493886747"
        },
        {
            name: "Sabrina Santana",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5ce6e7989435c90fd6f057aa"
        },
        {
            name: "Tarcísio da Silva",
            profileURL: "https://softwarenews.atlassian.net/rest/api/3/user?accountId=5a550eef897a4d2059aeeebd"
        }
    ]

export function getCollaborators() {
        return collaborators
}

export function getIssues() {
    
    return(
        fetch("localhost:8443", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
    )
}