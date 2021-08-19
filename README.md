# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## 技术栈

1. 编程语言：TypeScript 4.x + JavaScript
2. 构建工具：Vite 2.x
3. 前端框架：Vue 3.x
4. 路由工具：Vue Router 4.x
5. 状态管理：Vuex 4.x
6. UI 框架：Element Plus
7. CSS 预编译：Sass
8. HTTP 工具：Axios
9. Git Hook 工具：husky
10. 代码规范：EditorConfig + Prettier + ESLint + Airbnb JavaScript Style Guide
11. 提交规范：Commitizen + Commitlint


## 代码风格管理 EditorConfig + Prettier + ESLint
1. VSCode 使用 EditorConfig 需要去插件市场下载插件 EditorConfig for VS Code 
2. VSCode 编辑器使用 Prettier 配置需要下载插件 Prettier - Code formatter 。
3. VSCode 使用 ESLint 配置文件需要去插件市场下载插件 ESLint

格式化所有文件（. 表示所有文件）

```js
  npm run format
  npx prettier --write .
```

eslint 格式化

```js
  npm run eslint
  eslint --fix
```

## GIT commit message 格式规范

`npm run prepare`

`git commit -m "xxx" => git cz`

```js
git cz
git: 'cz' is not a git command. See 'git --help'.
npm i -g commitizen
git cz
```

```js
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>


feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

### type
| 值 | 描述 |
|--|--|
| feat | 新功能 |
| fix | 修复Bug |
| docs | 文档变更 |
| style | 代码格式（不影响功能，例如空格、分号等格式修正）|
| refactor | 代码重构 |
| test | 测试 |
| chore | 变更构建流程或辅助工具 |
| evert | 代码回退 |
