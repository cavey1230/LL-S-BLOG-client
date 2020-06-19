import MarkdownIt from "markdown-it"
import hljs from "highlight.js";

import "highlight.js/scss/default.scss";
import "highlight.js/styles/googlecode.css"

const Split = (preCode) => preCode.split(/\n/).slice(0, -1);

const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        // 此处判断是否有添加代码语言
        try {
            // 得到经过highlight.js之后的html代码
            const preCode = lang && hljs.getLanguage(lang) ? hljs.highlight(lang, str, true).value : mdParser.utils.escapeHtml(str)
            // 以换行进行分割
            const lines = Split(preCode);
            // 添加自定义行号
            let html = lines.map((item, index) => {
                return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
            }).join('')
            html = '<ol>' + html + '</ol>'
            // 添加代码语言
            return '<pre class="hljs"><code>' +
                html +
                '</code></pre>'
        } catch (__) {
        }
    }
})

export default mdParser