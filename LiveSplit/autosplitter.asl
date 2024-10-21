state("Gothic3")
{
    bool  loading  : 0x0002638C, 0xF0, 0x8, 0x20, 0x4, 0xE68;
    bool  unpaused : "Game.dll", 0x003F54B0, 0x2C;
    float igt 	   : "Engine.dll", 0x00614BD0, 0x330;

	int ardea  : 0x00015CA0, 0xC8, 0xC, 0xC, 0x340, 0x20, 0x48, 0x198, 0xFFFFDFAC;
	int boars  : 0x00015CA0, 0xC8, 0xC, 0xC, 0x340, 0x20, 0x48, 0x198, 0x8EC;
	int leader : 0x00015CA0, 0xC8, 0xC, 0xC, 0x340, 0x20, 0x48, 0x198, 0x5C2C;
}

init
{
    vars.splits = new Stack<string>();
    vars.splits.Push("leader");
    vars.splits.Push("boars");
    vars.splits.Push("ardea");

    vars.GetValue = (Func<ExpandoObject, string, object>)((ExpandoObject state, string variableName) =>
    {
        var stateDict = (IDictionary<string, object>)state;
        return stateDict[variableName];
    });
}

split
{
    if (current.loading)
        return;

    var currentSplit = vars.splits.Peek();

    var oldState = vars.GetValue(old, currentSplit);
    var newState = vars.GetValue(current, currentSplit);

    if ((oldState == 0 || oldState == 1) && newState == 2)
    {
        vars.splits.Pop();
        return true;
    }
}

startup
{
	vars.currentRunTime = 0;
}

onReset
{
	vars.currentRunTime = 0;
}

start
{
	return !current.loading && old.loading;
}

gameTime
{
	if (!current.loading && !current.unpaused) {
		return;
	}

	if (!old.loading && !old.unpaused) {
		vars.currentRunTime = System.TimeSpan.Parse(timer.CurrentTime.GameTime.ToString()).TotalMilliseconds;
	}

	if (current.igt - old.igt <= 0 ||
		(current.igt - old.igt) * 7200 > 0.1) {
		return System.TimeSpan.FromMilliseconds(vars.currentRunTime);
	}

	vars.currentRunTime += (current.igt - old.igt) * 7200 * 1000;
	return System.TimeSpan.FromMilliseconds(vars.currentRunTime);
}

isLoading
{
	return current.loading || current.unpaused;
}