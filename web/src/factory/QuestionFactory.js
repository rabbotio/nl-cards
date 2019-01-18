import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class QuestionFactory {
    static term({ topic }) {
        return <h2>{ReactHtmlParser(topic)}</h2>
    }
}