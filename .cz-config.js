module.exports = {
  // 可选选项
  types: [
    { value: 'feat', name: 'feat    新功能' },
    { value: 'fix', name: 'fix    修复' },
    { value: 'docx', name: 'docx    文档变更' },
    { value: 'style', name: 'style    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature, 也不是修复bug)'
    },
    { value: 'perf', name: 'perf    性能优化' },
    { value: 'test', name: 'test    增加测试' },
    { value: 'chore', name: 'chore    构建过程或辅助功能的变动' },
    { value: 'revert', name: 'revert    回退' },
    { value: 'build', name: 'revert    打包' }
  ],
  // 步骤
  // git cz
  messages: {
    type: '请选择提交的类型',
    customScope: '请输入修改的范围',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认要使用以上信息提交嘛(Y/N)'
  },
  // 跳过步骤
  // skipQuestions: ['body', 'footer'],
  // 默认长度为72（长度限制）
  subjectLimit: 72
}
