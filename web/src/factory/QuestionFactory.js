import React from 'react';

export default class QuestionFactory {
    static term(title) {
        return <h2>{title}</h2>
    }
}