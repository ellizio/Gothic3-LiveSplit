namespace Helper
{
    public class Condition
    {
        private const string QuestType = "quest";
        private const string SaveType = "save";
        
        public string Type { get; }
        public string Name { get; }

        public bool Completed { get; private set; }
        
        private Condition(string type)
        {
            Type = type;
        }
        
        private Condition(string type, string name) : this(type)
        {
            Name = name;
        }
        
        public void Complete() => Completed = true;
        
        internal static Condition ForQuest(string name) => new Condition(QuestType, name);
        internal static Condition ForSave() => new Condition(SaveType);
    }
}