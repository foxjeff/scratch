{-# LANGUAGE TemplateHaskell #-}

hs :: Integer -> Integer
hs n
  | n `mod` 2  == 0  = n `div` 2
  | otherwise        = 3 * n + 1

sump :: (Int,Int) -> Int
sump (x,y) = x + y

hseq :: Integer -> [Integer]
hseq 1 = [1]
hseq n = n : hseq (hs n)

intll :: [Integer] -> Integer
intll []     = 0
intll (_:xs) = 1 + intll xs

sumev2 :: [Integer] -> [Integer]
sumev2 []         = []
sumev2 (x:[])     = [x]
sumev2 (x:y:zs)  = (x + y) : sumev2 zs

hslen :: Integer -> Integer
hslen n = intll (hseq n) - 1

type Peg  = String
type Move = (Peg, Peg)
hanoi :: Integer -> Peg -> Peg -> Peg -> [Move]
hanoi 0 _ _ _ = [("erpa","derpa")]
hanoi n a b c
  | n == 1     = [(a,c)]
  | otherwise  = [("all","done")]
{- what is a move?
 is n==1 always a,c ?
 how to codify:
   move n - 1 discs from a to b using c as temporary storage
   move top disc a to c
   move n - 1 discs from b to c using a as temporary storage

for n = 2
  move n-1, or, (a,b)
  move (a,c)
  move (b,c)

for n = 3 (2^3 - 1 moves)
  move (a,c)
  move (a,b)
  move (c,b) -- 2 discs on b
  move (a,c) -- move top disc to c
  move (b,a) -- move 2 disc to c using a as temp
  move (b,c)
  move (a,c)
-}

data Thing = Shoe
           | Ship
           | SealingWax
           | Cabbage
           | King
           deriving Show

shoe :: Thing
shoe = Shoe

listO'Things :: [Thing]
listO'Things = [Shoe, SealingWax, King, Cabbage, King]

isSmall :: Thing -> Bool
isSmall Shoe        = True
isSmall Ship        = False
isSmall SealingWax  = True
isSmall Cabbage     = True
isSmall King        = False

data FailableDouble = Failure
                    | OK Double
                    deriving Show

safeDiv :: Double -> Double -> FailableDouble
safeDiv _ 0 = Failure
safeDiv x y = OK (x / y)

failureToZero :: FailableDouble -> Double
failureToZero Failure = 0
failureToZero (OK d) = d

-- Store a person's name, age, and favorite Thing
data Person = Person String Int Thing
  deriving Show
  
brent :: Person
brent = Person "Brent" 30 SealingWax

stan :: Person
stan = Person "Stan" 94 Cabbage

getAge :: Person -> Int
getAge (Person _ a _) = a

baz :: Person -> String
baz p@(Person n _ _) = "The name field of (" ++ show p ++ ") is " ++ n

main = putStrLn (baz brent)

checkFav :: Person -> String
checkFav (Person n _ SealingWax) = n ++ ", you're my kind of person!"
checkFav (Person n _ _)          = n ++ ", your favorite thing is lame."

data IntList = Empty | Cons Int IntList
             deriving Show
intListProd :: IntList -> Int
intListProd Empty = 1
intListProd (Cons x xs) = x * intListProd xs

addOneToAll :: IntList -> IntList
addOneToAll Empty = Empty
addOneToAll (Cons x xs) = Cons (x + 1) (addOneToAll xs)

myIntList = Cons 2 (Cons (-3) (Cons 5 Empty))

absAll :: IntList -> IntList
absAll Empty = Empty
absAll (Cons x xs) = Cons (abs x) (absAll xs)

squareAll :: IntList -> IntList
squareAll Empty = Empty
squareAll (Cons x xs) = Cons(x * x) (squareAll xs)

mapIntList :: (Int -> Int) -> IntList -> IntList
mapIntList _ Empty = Empty
mapIntList f (Cons x xs) = Cons (f x) (mapIntList f xs)

data List t = E | C t (List t)
            deriving Show
                     
filterList _ E = E
filterList p (C x xs)
  | p x       = C x (filterList p xs)
  | otherwise = filterList p xs

mapList :: (a -> b) -> List a -> List b
mapList f (C x xs) = C (f x) (mapList f xs)
mapList f E        = E

sq  x = x * x
dbl x = 2 * x
sp  x = x > ""

lst1 = C 2 (C (-3) (C 5 E))
lst4 = C "derpa" (C "kat" (C "sqange" E))

aa :: Int
aa = 23
bb :: Double
bb = 3.2

pts :: Int -> Int
pts 1 = 10
pts 2 = 6
pts x
    | x <= 6    = 7 - x
    | otherwise = 0


addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)  
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

charn :: Char -> String
charn 'a' = "a"
charn 'b' = "b"
charn 'c' = "c"
charn 'd' = "d"

capital :: String -> String
capital "" = "empty string"
capital all@(x:xs) = "the first letter of " ++ all ++ " is " ++ [x]

bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= skinny = "You're underweight, you emo, you!"  
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= fat = "You're fat! Lose some weight, fatty!"  
    | otherwise                 = "You're a whale, congratulations!"
    where bmi = weight / height ^ 2
          skinny = 18.5
          normal = 25.0
          fat    = 30.0
