import React, { useState, useEffect } from 'react';
import { getCollaborators } from '../state/state';

import './Dashboard.css';




const Dashboard = () => {
    // const [collaborators, setCollaborators] = useState([])
    const [projects, setProjects] = useState(["AH", "NS", "DES"])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [issues, setIssues] = useState([])
    

    //declarando o useEffect tendo como segundo parâmetro um array vazio, ele roda como se fosse ComponentDidMount. Se não passarmos isso, ele roda toda vez que o componente é criado ou atualizado (funcionando como componentdidmount e componentdidupdate)
    useEffect(() => {
          
    }, [])

    const searchIssues = () => {
        //get issues
        setIsLoading(true);

        fetch("http://localhost:8443")
        .then(r=> r.json())
        .then(data=>{
            setIssues(data);
            setIsLoading(false);
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className="">
            <h1>Controle de Atividade de Desenvolvimento</h1>
            <form>
                <select>
                    {projects.map((p)=>{
                        return(
                            <option value={p}>
                                {p}
                            </option>
                        )
                    })}
                </select>
            </form>
            {issues.length>0 ? 
            (
                <div  className="dev-issues">
                {issues.map((i)=> {
                    return(
                        <div key={i.key} className="dev-issue">
                            <p>{i.key}</p>
                            <p className="summary">{i.summary}</p>
                            <p>{i.assignee.name ? i.assignee.name : "DESATRIBUÍDO" }</p>
                        </div>
                    )
                })}
                </div>
            ) : (
                isLoading ? (
                    <p>carregando...</p>
                ) : (
                    <p>Faça sua busca</p>
                )
            )}
        </div>
    )
}

export default Dashboard