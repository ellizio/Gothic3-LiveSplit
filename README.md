# <p align="center"> Gothic3-LiveSplit </p>

<p align="center"> <a href="https://github.com/LiveSplit">LiveSplit</a> auto splitter script generator for Gothic 3 </p>

---


## Generator features

- Generates auto splitter script file (.asl)
- Generates splits file (.lss)


## Auto splitter features

- Supports following events:
  - Game saved
  - Quest completed
- Triggers a split for both a single event and a sequence of events


## How it works

Script based on conditions. The fulfillment of a condition is the occurrence of a certain event.\
A split contains one condition or a sequence of conditions. Split will be triggered when all conditions are completed.

> Example 1
> 
> Split contains Save condition\
> Split will be triggered after saving

> Example 2
> 
> Split contains Quest condition\
> Split will be triggered after completing the quest

> Example 3
> 
> Split contains following sequence: Quest condition, Save condition\
> Split will be triggered after completing the quest and then saving

> Example 4
>
> Split contains following sequence: Quest condition, Quest condition\
> Split will be triggered after completing two quests in a specific order


## Usage

Follow [instructions](/LiveSplit/README.md)


## Roadmap

- New events:
  - Skill learned
  - Spell learned
  - Item received
- Migration to LiveSplit component


## Additional References

- [LiveSplit](https://github.com/LiveSplit)