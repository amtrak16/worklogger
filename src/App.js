import React, { Component } from 'react';
// import './App.css';
import './ui-toolkit/css/nm-cx/main.css'

class App extends Component {
  constructor(props){
    super(props);

    this.state = 
      {projects: [],
        projVal: '',
        projErr: false,
        projMsg: '',
        descVal: '',
        descErr: false,
        descMsg: '',
        minsVal: 0,
        minsErr: false,
        minsMsg: '',
      } 

    this.inputReq = 'Input Required!'
    this.integerReq = 'Enter a number for minutes.'

    this.onProjIn = this.onProjIn.bind(this)
    this.onDescIn = this.onDescIn.bind(this)
    this.onMinsIn = this.onMinsIn.bind(this)
    this.onAddClick = this.onAddClick.bind(this)

    }

  onProjIn (evt) {
    if (evt.target.value.length < 0) {
      this.setState({ projErr: true, projMsg: this.inputReq })
    } else {
      this.setState({ projVal: evt.target.value, projErr: false, projMsg: ''})
    }
  }

  onDescIn (evt) {
    if (evt.target.value.length < 0) {
      this.setState({ descErr: true, descMsg: this.inputReq })
    } else {
      this.setState({ descVal: evt.target.value, descErr: false, descMsg: ''})
    }
  }

  onMinsIn (evt) {
    if (!Number.isInteger(parseInt(evt.target.value,10))) {
      this.setState({ minsErr: true, minsMsg: this.integerReq })
    } else {
      this.setState({ minsVal: evt.target.value, minsErr: false, minsMsg: ''})
    }
  }

  onAddClick (evt) {
    evt.preventDefault()
    const newWorkLogItem = {
      project: this.state.projVal,
      description: this.state.descVal,
      minutes: this.state.minsVal
    }
    let arr = [newWorkLogItem]
    this.setState({projects: arr})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <div class="card">
          <form onSubmit={this.onAddClick}>
            <div class="row">
              <div class="large-4 columns md-text-field with-floating-label">
                <input type="text" id="project_in" required onChange={this.onProjIn}/>
                <label for="project_in">Project</label>
                <span class="error">{this.state.projMsg}</span>
              </div>
            </div>
            <div class="row">
              <div class="large-4 columns md-text-field with-floating-label">
                <input type="text" id="desc_in" required onChange={this.onDescIn}/>
                <label for="desc_in">Description</label>
                <span class="error">{this.state.descMsg}</span>
              </div>
            </div>
            <div class="row">
              <div class="large-4 columns md-text-field with-floating-label">
                <input type="text" id="mins_in" required onChange={this.onMinsIn}/>
                <label for="mins_in">Minutes</label>
                <span class="error">{this.state.minMsg}</span>
              </div>
            </div>
            <div class="row padding-small">
              <button class="button btn-cta" >Add</button>
            </div>
          </form> 
        </div>
      </div>
    );
  }
}

export default App;
