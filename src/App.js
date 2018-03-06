import React, { Component } from 'react';
// import './App.css';
import './ui-toolkit/css/nm-cx/main.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        projWork: [],
        projPers: [],
        projVal: '',
        descVal: '',
        minsVal: '',
        projErr: false,
        projMsg: '',
        descErr: false,
        descMsg: '',
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

  onProjIn(evt) {
    if (evt.target.value.length < 0) {
      this.setState({ projErr: true, projMsg: this.inputReq })
    } else {
      this.setState({ projVal: evt.target.value, projErr: false, projMsg: '' })
    }
  }

  onDescIn(evt) {
    if (evt.target.value.length < 0) {
      this.setState({ descErr: true, descMsg: this.inputReq })
    } else {
      this.setState({ descVal: evt.target.value, descErr: false, descMsg: '' })
    }
  }

  onMinsIn(evt) {
    if (!Number.isInteger(parseInt(evt.target.value, 10))) {
      this.setState({ minsErr: true, minsMsg: this.integerReq })
    } else {
      this.setState({ minsVal: evt.target.value, minsErr: false, minsMsg: '' })
    }
  }

  onAddClick(evt) {
    evt.preventDefault()
    const newWorkLogItem = {
      projVal: this.state.projVal,
      descVal: this.state.descVal,
      minsVal: this.state.minsVal
    }
    if (this.state.projVal === "Work") {
      let arr = this.state.projWork
      arr.push(newWorkLogItem)
      this.setState({ projWork: arr, projVal: '', descVal: '', minsVal: '' })
    } else {
      let arr = this.state.projPers
      arr.push(newWorkLogItem)
      this.setState({ projPers: arr, projVal: '', descVal: '', minsVal: '' })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" >{this.props.title}</h1>
        </header>
        <div class="card">
          <form onSubmit={this.onAddClick}>
            <div class="row">
              <div class="small-4 columns md-text-field with-floating-label">
                <select class="os-default" value={this.state.projVal} onChange={this.onProjIn}>
                  <option value="" disabled selected id="project_in" required >Select an Option</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                </select>
                <span class="select-arrow"></span>
                <span class="error">{this.state.projMsg}</span>
              </div>
            </div>
            <div class="row">
              <div class="small-4 columns md-text-field with-floating-label">
                <input type="text" id="desc_in" value={this.state.descVal} required onChange={this.onDescIn} />
                <label for="desc_in">Description</label>
                <span class="error">{this.state.descMsg}</span>
              </div>
            </div>
            <div class="row">
              <div class="small-4 columns md-text-field with-floating-label">
                <input type="number" id="mins_in" max="480" min="15" value={this.state.minsVal} step="15" required onChange={this.onMinsIn} />
                <label for="mins_in">Minutes in multiple of 15</label>
                <span class="error">{this.state.minMsg}</span>
              </div>
            </div>
            <div class="row padding-small">
              <button class="button btn-cta" >Add Item</button>
            </div>
          </form>
          <div class="row">
            <div class="small-6 columns">
              <RenderWorkItems workItemList={this.state.projWork} type="Work"/>
            </div>
            <div class="small-6 columns">
              <RenderWorkItems workItemList={this.state.projPers} type="Personal"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class RenderWorkItems extends Component {
  render() {
    let workItemRows = [];
    this.props.workItemList.forEach((workItem, idx) => {
      if (idx === 0) {
        workItemRows.push(
          <div class="row">
            <div class="small-3 columns"><h1>{this.props.type}</h1></div>
            <div class="small-3 columns">&nbsp;</div>         
          </div>       
        )
        workItemRows.push(
        <div class="row">
          <div class="small-3 columns">Description</div>
          <div class="small-1 columns">Minutes</div>
          <div class="small-2 columns">&nbsp;</div>
        <div class="row"></div>
      </div>
        )
      }
      workItemRows.push(
        <div class="row">
          <div class="small-3 columns">{workItem.descVal}</div>
          <div class="small-1 columns">{workItem.minsVal}</div>
          <div class="small-2 columns">&nbsp;</div>
        </div>
      )
    })

    return (
        <div>{workItemRows}</div>
    );
  }
}

export default App;
