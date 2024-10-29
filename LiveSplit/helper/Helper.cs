using System.Collections.Generic;
using System.Linq;

namespace Helper
{
    public class Helper
    {
        public Condition CreateQuestCondition(string name) => Condition.ForQuest(name);
        public Condition CreateSaveCondition() => Condition.ForSave();
        
        public Split CreateSplit(params Condition[] conditions) => new Split(conditions);

        public Stack<Split> BuildSplits(params Split[] splits) => new Stack<Split>(splits.Reverse());
    }
}