def myAssert =  {a,b,msg ->
    if (a==b)
        "assert '$msg' was true"
    else
        assert(a==b)
}
println myAssert (1,1, "1 == 1")
println myAssert ('a','a', "a == a")