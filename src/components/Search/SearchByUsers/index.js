import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {setIssues} from '../../../actions';
import {connect} from 'react-redux';

const SearchByUsers = (props) => {
  const [users, setUsers] = useState([
      "Wallacy Freitas",
      "Robson\ Ferreira",
      "Leandro\ Leal",
      "Marcos\ Assis",
      "Alan\ Santos",
      "Sabrina\ Santana",
      "Felipe\ Melo",
      "Gabriel\ Nascimento\ Lima",
      "Tarcísio\ Ângelo\ da\ Silva"
  ])
  const [selectedUser, setSelectedUser] = useState("...")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const clearSearch = () => {
    setEndDate("")
    setStartDate("")
    setSelectedUser("...")
  }

  const searchIssues = () => {
    if(startDate === "" || endDate === "" || selectedUser === "...") {
        alert('insira os dados da busca');
    } else {
        //get issues
        setIsLoading(true);
        
        fetch(`http://localhost:8443/search-by-user?user="${selectedUser}"&startDate=${startDate}&endDate=${endDate}`)
        .then(r=> r.json())
        .then(data=>{
            // setIssues(data);
            setIsLoading(false);
            props.updateIssues(data);
        })
        .catch(err=>console.log(err))
    }
}

  return(
    <div>
      <form>
              <select className="search-input" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                  <option value="...">Usuário</option>
                  {users.map((u)=>{
                      return(
                          <option key={u} value={u}>
                              {u}
                          </option>
                      )
                  })}
              </select>
              <DayPickerInput placeholder="dd/mm/aaaa" formatDate={(date)=> date.toLocaleDateString()} selected={startDate} onDayChange={date => {setStartDate(date.toLocaleDateString().split('/').reverse().join('/'));/*console.log(date.toLocaleDateString())*/}} />
              <DayPickerInput placeholder="dd/mm/aaaa" formatDate={(date)=> date.toLocaleDateString()} selected={endDate} onDayChange={date => {setEndDate(date.toLocaleDateString().split('/').reverse().join('/'));/*console.log(date.toLocaleDateString())*/}} />
              <button className="search-button" type="button" onClick={searchIssues}>Buscar</button>
              <button className="search-button" style={{background: "red"}} type="button" onClick={clearSearch}>Limpar</button>
          </form>
          {props.issues.length>0 ? 
            (
                <div  className="dev-issues">
                { isLoading ? <p>Carregando...</p> : <p><strong>{props.issues.length}</strong> resultados encontrados</p>}
                {props.issues.map((i)=> {
                    return(
                        <a key={i.key} href={"https://softwarenews.atlassian.net/browse/"+i.key} target="_blank" style={{color: 'inherit'}}>
                            <div className="dev-issue" style={i.tester.name && {"background": "#ade1ff"}}>
                                {i.tester.name && <p className="issue-tester">Tester: {i.tester.name}</p>}
                                <p className="issue-key">{i.key}</p>
                                <p className="issue-summary">{i.summary}</p>
                                <p className="issue-status">{i.status }</p>
                                <p className="issue-assignee">{i.assignee.name ? i.assignee.name : "DESATRIBUÍDO" }</p>
                            </div>
                        </a>
                    )
                })}
                </div>
            ) : (
                isLoading ? (
                    <p>carregando...</p>
                ) : (
                    <p style={{"color": "#b5b5b5"}}>- Faça sua busca -</p>
                )
            )}
    </div>
  );
}

function mapStateToProps(state) {
  return {issues: state.issues}
}

export default connect(mapStateToProps, {
updateIssues: setIssues  
})(SearchByUsers)