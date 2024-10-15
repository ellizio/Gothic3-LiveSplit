state("Gothic3")
{
	int ardea : "Script.dll", 0x00066E00, 0xF4, 0x204, 0x8, 0x3B4, 0x4, 0x8, 0xFFFF956C;
	int gorn : "Script.dll", 0x00066E00, 0xF4, 0x204, 0x8, 0x3B4, 0x4, 0x8, 0x6AC;
	int boars : "Script.dll", 0x00066E00, 0xF4, 0x204, 0x8, 0x3B4, 0x4, 0x8, 0xFFFFBEAC;
	int leader : "Script.dll", 0x00066E00, 0xF4, 0x204, 0x8, 0x3B4, 0x4, 0x8, 0x11EC;
}

init
{
    vars.splits = new Stack<string>();
    vars.splits.Push("leader");
    vars.splits.Push("boars");
    vars.splits.Push("gorn");
    vars.splits.Push("ardea");

    vars.GetValue = (Func<ExpandoObject, string, object>)((ExpandoObject state, string variableName) =>
    {
        var stateDict = (IDictionary<string, object>)state;
        return stateDict[variableName];
    });
}

split
{
    var currentSplit = vars.splits.Peek();

    var oldState = vars.GetValue(old, currentSplit);
    var newState = vars.GetValue(current, currentSplit);

    if ((oldState == 0 || oldState == 1) && newState == 2)
    {
        vars.splits.Pop();
        return true;
    }
}