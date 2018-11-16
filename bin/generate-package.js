#!/usr/bin/env node
const { promisify } = require('util')
const { join } = require('path')
const { readFile, writeFile } = require('fs')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

const BASE_PATH = process.cwd()
const PACKAGE_FILE = 'package.json'
const TARGET_PATH = 'dist'

readFileAsync(join(BASE_PATH, PACKAGE_FILE), { encoding: 'utf8' })
  .then(function parse (str) {
    return JSON.parse(str)
  })
  .then(function updateJson ({ dependencies, devDependencies, private: priv, scripts, husky, ...rest }) {
    return {
      ...rest,
      peerDependencies: dependencies
    }
  })
  .then(function stringify (obj) {
    return JSON.stringify(obj, null, 2)
  })
  .then(function savePackage (data) {
    return writeFileAsync(join(BASE_PATH, TARGET_PATH, PACKAGE_FILE), `${data}\n`)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
