## Animals_2a3.py -- a complete OO zoo !!               DMQ 6/10/04
'''
# Animal     -->    Reptile
# -------           -------
# Animal     -->    Mammal     -->    Bovine
# -------           -------           -------
# Animal     -->    Mammal     -->    Canine
# -------           -------           ------
# Animal     -->    Mammal     -->    Feline     -->    Cat
# -------           -------           -------           -------
# _numAnimals       _numMammals       _numFelines       _numCats
# home                                genus
# __init__()        __init__()        __init__()        __init__()
#                       .sound                              .sound
#                                                           .name
# show()            show()            show()            show()
#                   talk()                              talk()
#
'''

class Animal(object):
    "Ancestor of the Animal hierarchy"
    _numAnimals = 0
    home = "Earth"
    def __init__(self):
        Animal._numAnimals += 1
    def show():
        print "Inventory:"
        print " Animals:", Animal._numAnimals
    show = staticmethod(show)

class Reptile(Animal): pass
class Mammal(Animal):
    _numMammals = 0
    basal_metabolic_rate = 7.2
    def __init__( self, s = "Maa... Maa..."):
        Animal.__init__(self)
        Mammal._numMammals += 1
        self.sound = s
    def show():
        Animal.show()
        print " Mammals:", Mammal._numMammals,
        print "        BMR =", Mammal.basal_metabolic_rate
    show = staticmethod(show)
    def talk(self):
        print "Mammal sound: ", self.sound

class Bovine(Mammal): pass
class Canine(Mammal): pass
class Feline(Mammal):
    _numFelines = 0
    genus = "feline"
    def __init__( self):
        Mammal.__init__(self)
        Feline._numFelines += 1
    def show():
        Mammal.show()
        print " Felines:", Feline._numFelines
    show = staticmethod(show)

class Cat(Feline):
    _numCats = 0
    def __init__( self, n = "unknown", s = "Meow" ):
        Feline.__init__(self)
        Cat._numCats += 1
        self.name = n
        self.sound = s
    def show():
        Feline.show()
        print "    Cats:", Cat._numCats
    show = staticmethod(show)
    def talk(self):
        print "My name is ...", self.name
        print "I am a %s from %s" % (self.genus, self.home)
        Mammal.talk(self)

if __name__ == '__main__':
    a = Animal()
    m = Mammal(); print "m:",; m.talk()
    f = Feline(); print "f:",; f.talk()
    c = Cat();    print "c:",; c.talk()
    print "--- Cat.show() ---"
    Cat.show()
    print "--- cat1.talk() ---"
    cat1 = Cat("Garfield", "Purr")
    cat1.talk()