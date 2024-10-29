state("Gothic3")
{
    int saving      : "Game.dll", 0x3F66E0, 0x18;
    bool loading    : "Engine.dll", 0x36A3C0, 0x83C, 0xD14;
    bool paused     : "Engine.dll", 0x602A98, 0x928;

{{#each quests}}
    int {{id}} : "{{baseAddress}}"{{#each offsets}}, 0x{{this}}{{/each}};
{{/each}}
}

startup
{
    // Starting logic
    vars.Started = false;

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
    var helper = vars.Helper = Assembly.Load(File.ReadAllBytes("Components/Gothic3-LiveSplit.dll")).CreateInstance("Helper.Helper");

    vars.SetupSplits = (Action)(() =>
    {
{{#each splits}}
        var split_{{@index}} = helper.CreateSplit(
{{#each conditions}}
{{#if @first}}           {{else}}          ,{{/if}}{{#if (isQuest this)}} helper.CreateQuestCondition("{{value}}")
{{else}} helper.CreateSaveCondition()
{{/if}}
{{/each}}
        );
{{/each}}

        vars.Splits = helper.BuildSplits(
{{#each splits}}
{{#if @first}}            split_{{@index}}{{else}}          , split_{{@index}}{{/if}}
{{/each}}
        );
    });
    vars.SetupSplits();
}

update
{
    if (!vars.Started)
        return;

    if (vars.Splits.Count == 0)
        return false;

    // Saving logic
    // TODO: wrap to method
    vars.WasSaved = vars._isSaving && current.saving == 1;
    vars._isSaving = current.saving == 3;

    // Splits
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
    vars.Started = false;
	vars.SetupSplits();
}

onStart
{
    vars.Started = true;
}