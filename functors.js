> class W {
... constructor (v) {
..... this.value = v
..... }}
[Function: W]
> new W(23)
W { value: 23 }
> const add3 = x => x + 3
undefined
> add3(23)
26
> [2,3,4].map(add3)
[ 5, 6, 7 ]
> W
[Function: W]
> W.map = f => {return new W(f(this.value))}}
...
> W.map = f => {return new W(f(this.value))}
[Function]
> const p = new W(23)
undefined
> p.map(add3)
TypeError: p.map is not a function
    at repl:1:3
    at REPLServer.defaultEval (repl.js:252:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
> W
{ [Function: W] map: [Function] }
> p
W { value: 23 }
> class W {
... constructor (v) {
..... this.value = v
..... }
... map(f) {return new W(f(this.value))}}
TypeError: Identifier 'W' has already been declared
    at repl:1:1
    at REPLServer.defaultEval (repl.js:252:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
> class W2 {
... constructor (v) {
..... this.value = v
..... }
... map(f) {return new W(f(this.value))}}
[Function: W2]
> let p = new W2(23)
TypeError: Identifier 'p' has already been declared
    at repl:1:1
    at REPLServer.defaultEval (repl.js:252:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
> let p2 = new W2(23)
undefined
> p2.map(add3)
W { value: 26 }
> p2.map(add3)
W { value: 26 }
> p2
W2 { value: 23 }
> class VM {constructor(o) {this.object = o} map(f) {
... const mapped = {}
... for (const key of Object.keys(this.object)) {
..... mapped[key] = f(this.object[key])}
... return new VM(mapped)}}
[Function: VM]
> const md = {m1:23,m2:52}
undefined
> const mdf = new VM(md)
undefined
> mdf
VM { object: { m1: 23, m2: 52 } }
> const tylf = mdf.map(add3_
SyntaxError: missing ) after argument list
    at Object.exports.createScript (vm.js:24:10)
    at REPLServer.defaultEval (repl.js:225:25)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
> const tylf = mdf.map(add3)
undefined
> tylf.object
{ m1: 26, m2: 55 }
> mdf
VM { object: { m1: 23, m2: 52 } }
> mdf.object
{ m1: 23, m2: 52 }
> const sm = x => add3(x*x)
undefined
> sm(2)
7
> sm(10)
103
> const gfn = n => `hello, ${name}`
undefined
> gfn('arf')
ReferenceError: name is not defined
    at n (repl:1:28)
    at repl:1:1
    at REPLServer.defaultEval (repl.js:252:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
> const gfn = n => `hello, ${n}`
TypeError: Identifier 'gfn' has already been declared
    at repl:1:1
    at REPLServer.defaultEval (repl.js:252:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:417:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
    at REPLServer.Interface._line (readline.js:549:8)
    at REPLServer.Interface._ttyWrite (readline.js:826:14)
> const gfn2 = n => `hello, ${n}`
undefined
> gfn2('arf')
'hello, arf'
> const ps = {a: {fn:'a', ln:'b'},b: {fn:'c',ln:'d'}}
undefined
> ps
{ a: { fn: 'a', ln: 'b' }, b: { fn: 'c', ln: 'd' } }
> const fn = p => `${p.fn} + ${p.ln}`
undefined
> fn(ps.a)
'a + b'
> fn(ps.b)
'c + d'
> const gfp = p => gfn2(fn(p))
undefined
> gfp(ps.a)
'hello, a + b'
> gfp(ps.b)
'hello, c + d'
> const g1 = (new VM(ps)
... .map(fn)
... )
undefined
> g1
VM { object: { a: 'a + b', b: 'c + d' } }
> const g2 = (new VM(ps)
... .map(fn)
... .map(gfn2)
... .object)
undefined
> g2
{ a: 'hello, a + b', b: 'hello, c + d' }
> const g3 = (new VM(ps)
... .map(gfp)
... .object)
undefined
> g3
{ a: 'hello, a + b', b: 'hello, c + d' }
> VM
[Function: VM]
> VM.
VM.__defineGetter__      VM.__defineSetter__      VM.__lookupGetter__      VM.__lookupSetter__
VM.__proto__             VM.constructor           VM.hasOwnProperty        VM.isPrototypeOf
VM.propertyIsEnumerable  VM.toLocaleString        VM.toString              VM.valueOf

VM.apply                 VM.arguments             VM.bind                  VM.call
VM.caller                VM.length                VM.name

VM.prototype

> let ps3 = new VM(ps)
undefined
> ps3
VM {
  object: { a: { fn: 'a', ln: 'b' }, b: { fn: 'c', ln: 'd' } } }
> ps3.
ps3.__defineGetter__      ps3.__defineSetter__      ps3.__lookupGetter__
ps3.__lookupSetter__      ps3.__proto__             ps3.constructor
ps3.hasOwnProperty        ps3.isPrototypeOf         ps3.propertyIsEnumerable
ps3.toLocaleString        ps3.toString              ps3.valueOf

ps3.map

ps3.object

> ps3.object
{ a: { fn: 'a', ln: 'b' }, b: { fn: 'c', ln: 'd' } }
> ps3.map(gfp)
VM { object: { a: 'hello, a + b', b: 'hello, c + d' } }
> ps3.map(gfp).object
{ a: 'hello, a + b', b: 'hello, c + d' }
> ps3.map(gfp).object.a
'hello, a + b'
> ps3.map(gfp).object.b
'hello, c + d'
>
