import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import './Dashboard.css';




const Dashboard = () => {
    // const [collaborators, setCollaborators] = useState([])
    const [projects, setProjects] = useState(["DA", "AH", "NS", "DES"])
    const [selectedProj, setSelectedProj] = useState(null)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [issues, setIssues] = useState([])
    

    //declarando o useEffect tendo como segundo parâmetro um array vazio, ele roda como se fosse ComponentDidMount. Se não passarmos isso, ele roda toda vez que o componente é criado ou atualizado (funcionando como componentdidmount e componentdidupdate)
    useEffect(() => {
          
    }, [])

    const searchIssues = () => {
        if(startDate === "" || endDate === "" || selectedProj === null) {
            alert('insira os dados da busca');
        } else {
            //get issues
            setIsLoading(true);
    
            fetch(`http://localhost:8443?proj=${selectedProj}&startDate=${startDate}&endDate=${endDate}`)
            .then(r=> r.json())
            .then(data=>{
                setIssues(data);
                setIsLoading(false);
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <div className="">
            <h1>Controle de Atividade de Desenvolvimento</h1>
            <form>
                <select onChange={e => setSelectedProj(e.target.value)}>
                    {projects.map((p)=>{
                        return(
                            <option key={p} value={p}>
                                {p}
                            </option>
                        )
                    })}
                </select>
                <input name="start" type="text" placeholder="aaaa/mm/ddd" onChange={e => setStartDate(e.target.value)}/>
                <input name="end" type="text" placeholder="aaaa/mm/ddd" onChange={e => setEndDate(e.target.value)}/>
                <button type="button" onClick={searchIssues}>Buscar</button>
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