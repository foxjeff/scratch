def l1 = [5,6,1,2]
final List l2 = l1
println l2 << 23 //=> [5,6,1,2,23] , not so final
List<Integer> l3 = l1.clone()
l1.sort()
println "l1: $l1, l2: $l2, l3: $l3, ${l3.inspect()}"
def u = "arf"
def y = "$u"
y.inspect()
def r = 21..<24
r.inspect()
r.each { println it }
-----
class Foo {
    final int bar // this final works
    final Map baz // final has no affect on Map, List, etc?
        class Bax {int boz = 23}
    final Bax bax = new Bax()

    def Foo() {
        bar = 13
        baz = [:]
    }
//    void setBar(z) { bar = z + 2 } // cannot declare this method if bar is final
    def getBar() { "katang $bar" }
}
def myFoo = new Foo()
myFoo.bar = 23 // this fails if bar is final
myFoo.baz.arf = 13 // this works
myFoo.baz = [beep:26] // doesn't work if baz is final
myFoo.baz = [13] // this fails if baz is final

myFoo.dump()
-----
@Grab("org.spockframework:spock-core:1.0-groovy-2.4")
import spock.lang.*

class TestIt extends Specification {
    class Erp {
        def dotcom
        def Erp() {
            dotcom = [1,2,3]
        }
        def checkIt(_guess) {
            int guess = _guess - 48
            dotcom.find { it == guess } ? true : false
        }
        def getGuess() {
            def reader = System.in.newReader()
            def input = reader.read()
            input
        }
    }
    def "yerp"() {
        expect:
            1 == 1
    }
    def "checking it"() {
        when: "stuff"
            def eep = new Erp()
        then: "others"
            eep.dotcom == [1,2,3]
            eep.checkIt eep.getGuess()

    }
}
------
@Grab("org.spockframework:spock-core:1.0-groovy-2.4")
import spock.lang.*

class TestIt extends Specification {
    class Erp {
        def dotcom
        def Erp() {
            dotcom = [1,2,3]
        }
        def checkIt(guess) {
            dotcom.find { it == guess } ? true : false
        }
        def getGuess() {
            def reader = System.in.newReader()
            char input = reader.read()
//            int guess = _guess - 48
            input -= 48
        }
    }
    def "yerp"() {
        expect:
            1 == 1
    }
    def "checking dotcom"() {
        when: "stuff"
            def eep = new Erp()
        then: "others"
            eep.dotcom == [1,2,3]
    }
    def "check guess"() {
        when:
            def eep = new Erp()
        then:
            eep.checkIt guess // eep.getGuess()
        where:
            guess | _
            0     | _
            1     | _
            2     | _
            3     | _
            4     | _
    }
}

