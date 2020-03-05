import MarkdownHelper from './markdown.helper';
import marked from 'marked';

describe('MarkdownHelper', () => {
  it('should get one item length', () => {
    const tokens = marked.lexer(`
 -  [ ] 组织成熟度:5
     -  [ ] 流程
     -  [ ] 成熟度模型
 -  [ ] 模型与原则 :1
     -  [ ] 基础实践
     -  [ ] 关键实践
    `);
    const json = MarkdownHelper.markdownToJSON(tokens, {});
    expect(json.length).toEqual(2);
  });

  it('should correct get children size', () => {
    const tokens = marked.lexer(`
 -  [ ] 组织成熟度:5
     -  [ ] 流程
     -  [ ] 成熟度模型
 -  [ ] 模型与原则 :1
     -  [ ] 基础实践
     -  [ ] 关键实践
    `);
    const json = MarkdownHelper.markdownToJSON(tokens, {});
    expect(json[0].item.text).toEqual('组织成熟度:5');
    expect(json[0].childrens.length).toEqual(2);
    expect(json[1].childrens.length).toEqual(2);
  });
});

