import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {setIssues} from '../../../actions';
import {connect} from 'react-redux';

const SearchByProject = (props) => {
  const [projects, setProjects] = useState(["DA", "AH", "NS", "DES", "HOM", "SL"])
  const [selectedProj, setSelectedProj] = useState("...")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const clearSearch = () => {
    setEndDate("")
    setStartDate("")
    setSelectedProj("...")
  }

  const searchIssues = () => {
    if(startDate === "" || endDate === "" || selectedProj === "...") {
        alert('insira os dados da busca');
    } else {
        //get issues
        setIsLoading(true);
        
        fetch(`http://localhost:8443/search-by-project?proj=${selectedProj}&startDate=${startDate}&endDate=${endDate}`)
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
              <select className="search-input" value={selectedProj} onChange={e => setSelectedProj(e.target.value)}>
                  <option value="...">Projeto</option>
                  {projects.map((p)=>{
                      return(
                          <option key={p} value={p}>
                              {p}
                          </option>
                      )
                    })}
              </select>
              <DayPickerInput className="search-input" placeholder="dd/mm/aaaa" formatDate={(date)=> date.toLocaleDateString()} selected={startDate} onDayChange={date => {setStartDate(date.toLocaleDateString().split('/').reverse().join('/'));/*console.log(date.toLocaleDateString())*/}} />
              <DayPickerInput placeholder="dd/mm/aaaa" formatDate={(date)=> date.toLocaleDateString()} selected={endDate} onDayChange={date => {setEndDate(date.toLocaleDateString().split('/').reverse().join('/'));/*console.log(date.toLocaleDateString())*/}} />
              <button className="search-button" type="button" onClick={searchIssues}>Buscar</button>
              <button className="search-button" style={{background: "red"}} type="button" onClick={clearSearch}>Limpar</button>
          </form>
          {props.issues.length>0 ? 
            (
                <div  className="dev-issues">
                { isLoading && <p>Carregando...</p> }
                {props.issues.map((i)=> {
                    return(
                        <a key={i.key} href={"https://softwarenews.atlassian.net/browse/"+i.key} target="_blank" style={{color: 'inherit'}}>
                            <div className="dev-issue">
                                <p className="issue-key">{i.key}</p>
                                <p className="issue-summary">{i.summary}</p>
                                <p className="issue-status">{i.status}</p>
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
})(SearchByProject)