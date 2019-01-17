import React, { Component } from 'react';
import MathJax from 'react-mathjax2'
import './App.css';

const ascii = '\\text{Accuracy} = \\frac{\\text{True Positives} + \\text{True Negatives}} {\\text{Total Number Of Examples}}'
const content = `$$${ascii}$$`

class App extends Component {
  render() {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>Accuracy in binary classification</h3>
          </div>
          <div className="flip-card-back">
            <MathJax.Context
              input='ascii'
              onLoad={() => console.log("Loaded MathJax script!")}
              onError={(MathJax, error) => {
                console.warn(error);
                console.log("Encountered a MathJax error, re-attempting a typeset!");
                MathJax.Hub.Queue(
                  MathJax.Hub.Typeset()
                );
              }}
              script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
              options={{
                asciimath2jax: {
                  useMathMLspacing: true,
                  delimiters: [["$$", "$$"]],
                  preview: "none",
                }
              }}
            >
              <MathJax.Text text={content} />
            </MathJax.Context>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
