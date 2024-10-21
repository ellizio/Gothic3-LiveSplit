state("Gothic3")
{
    int save        : "Game.dll", 0x003F66E0, 0x18;

    bool  loading   : 0x0002638C, 0xF0, 0x8, 0x20, 0x4, 0xE68;
    bool  unpaused  : "Game.dll", 0x003F54B0, 0x2C;
    float igt       : "Engine.dll", 0x00614BD0, 0x330;

	int bogir  : 0x00015CA0, 0xC8, 0xC, 0xC, 0x340, 0x20, 0x48, 0x198, 0xFFFFFDAC;
}

startup
{
    vars.currentRunTime = 0;

    // Saving logic
    vars._isSaving = false;
    vars.WasSaved = false;

    // Methods
    vars.GetStateValue = (Func<ExpandoObject, string, object>)((ExpandoObject state, string variableName) =>
    {
        var stateDict = (IDictionary<string, object>)state;
        return stateDict[variableName];
    });

    // Splits
    var helper = vars.Helper = Assembly.Load(File.ReadAllBytes("D:\\Projects\\dotnet\\Tests\\G3Helpers\\AslHelperFr\\bin\\Release\\AslHelperFr.dll"))
        .CreateInstance("AslHelperFr.Helper");

    vars.SetupSplits = (Action)(() =>
    {
        var q_bogir = helper.CreateQuestCondition("bogir");
        var s_bogir = helper.CreateSaveCondition();
        var split_bogir = helper.CreateSplit("bogir", q_bogir, s_bogir);

        vars.Splits = helper.BuildSplits(split_bogir);
    });
    vars.SetupSplits();
}

update
{
    // TODO: skip when not started

    // Saving logic
    // TODO: wrap to method
    vars.WasSaved = vars._isSaving && current.save == 1;
    vars._isSaving = current.save == 3;

    if (vars.Splits.Count == 0)
        return false;

    var currentSplit = vars.Splits.Peek();
    var currentCondition = currentSplit.GetUncompletedCondition();
    if (currentCondition.Type == "quest")
    {
        var oldValue = vars.GetStateValue(old, currentCondition.Name);
        var currentValue = vars.GetStateValue(current, currentCondition.Name);

        if ((oldValue == 0 || oldValue == 1) && currentValue == 2)
            currentCondition.Complete();
    }
    else // save
    {
        if (vars.WasSaved)
            currentCondition.Complete();
    }
}

split
{
    if (current.loading)
        return;

    var currentSplit = vars.Splits.Peek();
    if (currentSplit.NeedSplit)
    {
        vars.Splits.Pop();
        return true;
    }
}

onReset
{
	vars.currentRunTime = 0;

	vars.SetupSplits();
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