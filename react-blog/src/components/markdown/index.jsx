/*
 * @Author: yyz
 * @Date: 2021-01-21 17:23:05
 */

import React, { useEffect, useState } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
// import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import less from 'highlight.js/lib/languages/less';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import cpp from 'highlight.js/lib/languages/cpp';
import nginx from 'highlight.js/lib/languages/nginx';
import shell from 'highlight.js/lib/languages/shell';
import './index.css'
/**
 * 为代码块显示添加行号
 * @param {String} code MD的代码内容
 */

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('less', less);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('shell', shell);


function beforNumber(code) {
  if (!code.trim()) {
    return code;
  }
  const list = code.split('\n');
  const spanList = ['<span aria-hidden="true" line-row>'];
  list.forEach(() => {
    spanList.push('<span></span>');
  });
  spanList.push('</span>');
  list.push(spanList.join(''));
  return list.join('\n');
}

function Markdown({ content }) {
  const [html, setHtml] = useState();
  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight(code) {
        return beforNumber(hljs.highlightAuto(code).value);
      },
    });

    setHtml(content ? marked(content) : null);
  }, [content]);

  return (
    <div className="centent">
      <div
        id="content"
        className="article-detail"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}

export default Markdown;