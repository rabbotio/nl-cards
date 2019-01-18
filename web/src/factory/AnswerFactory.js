import React from 'react';
import MathJax from 'react-mathjax2'

export default class AnswerFactory {
    static math({ math, desc }) {
        return (
            <div>
                <MathJax.Context
                    input='tex'
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
                    <MathJax.Text text={`$$${math}$$`} />
                </MathJax.Context>
                <p>{desc}</p>
            </div>

        )
    }
}