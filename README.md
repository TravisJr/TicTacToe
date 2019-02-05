# TicTacToe

This is an old, well-known game.


You can try to play with a friend or test the AI. AI has three levels of difficulty: 
+ Easy; 
+ Normal; 
+ Hard.

## Easy level

At this level of complexity, the algorithm often goes to random cells. In defense, mistakes are also made, giving the player to win.

## Normal level


When attacking, this algorithm is smarter, but it can still make a mistake. In defense, the algorithm operates more efficiently, analyzing all the known tactics of victory.


## Hard level


At this level of difficulty it is impossible to win. In defense, the algorithm analyzes your actions and prevents you from winning. 
In the attack, the algorithm uses all known tactics of victory. The random function allows you to diversify the game.

### Interesting solution

For the first turn, the player has 9 cells. 
If we calculate each turn, we get !9=362880 scenarios. I found a solution in the form of SPIN function. Look.

```
xx-
-x-
---
```
For analysis, I use only 3 cells. If a player goes to other cells - I just spin the playing field. Like this...

```
---       ---      o--
---  =>   ---  =>  ---
--о       o--      ---

```


Let's number the cells to make it clearer.

```
123       741      987
456  =>   852  =>  654
789       963      321

```


In addition to the analysis, this function is used to diversify the game. 
More details you can see in the code. 

I hope you were interested. Thank.




