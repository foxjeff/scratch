@Grab("org.spockframework:spock-core:1.0-groovy-2.4")
import spock.lang.*
class PublisherSpec extends Specification {
    class Publisher {
        List<Subscriber> subscribers = []
        void send(String message){
            subscribers.each {it.receive(message)}
        }
    }
    interface Subscriber {
        def receive(String message)
    }
    Publisher publisher = new Publisher()
    Subscriber subscriber = Mock()
    Subscriber subscriber2 = Mock()
    def setup() {
        publisher.subscribers << subscriber << subscriber2
    }
    def "should send message to all subscribers"() {
        when:
            publisher.send("hello")
        then:
            1 * subscriber.receive("hello") >> "ok"
            1 * subscriber2.receive("hello")
    }
    def "erping"() {
        expect: 1 == erp
        cleanup:
        println "all done"
        where: erp = 1
    }
    def cleanupSpec() { println "really all done" }
}