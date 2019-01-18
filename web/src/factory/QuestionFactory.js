import React from 'react';

export default class QuestionFactory {
    static term({ topic }) {
        return <h2>{topic}</h2>
    }
}