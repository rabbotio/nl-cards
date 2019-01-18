import React from 'react';
import MathJax from 'react-mathjax2'
import ReactHtmlParser from 'react-html-parser';

export default class AnswerFactory {
    static math({ math, desc }) {
        return (
            <div>
                <MathJax.Context
                    script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_SVG"
                >
                    <MathJax.Text text={`$$${math}$$`} />
                </MathJax.Context>
                <p>{ReactHtmlParser(desc)}</p>
            </div >

        )
    }
}