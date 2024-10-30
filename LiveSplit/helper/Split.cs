using System.Collections.Generic;
using System.Linq;

namespace Helper
{
    public class Split
    {
        public IEnumerable<Condition> Conditions { get; }
        public bool NeedSplit => Conditions.All(c => c.Completed);

        internal Split(params Condition[] conditions)
        {
            Conditions = conditions;
        }
        
        public Condition GetUncompletedCondition() => Conditions.First(c => !c.Completed);
    }
}