interface Context {
    // business options
    exportClassBusinessOptions: ExportClassBusinessOptions;
    importClassBusinessOptions: ImportClassBusinessOptions;
    SQLValidationOptions: SQLValidationOptions;
    SQLBusinessOptions: SQLBusinessOptions;
}

type ExportClassBusinessOptions = {
    classString         ?: string,
    selectType          ?: string,
    exportPath          ?: string,
    namespaceOrDatabase ?: string,
}
type ImportClassBusinessOptions = {
    filePath : string,
    inputTypeRemote         ?: string,
    inputTypeLocal    ?: string,
    importTypeFile      ?: string,
    importTypeDirectory ?: string,
    compileImportedItems?: string,
    compileFlags ?: string,
    runInBackground ?: string,
    selectType          ?: string,
    namespaceOrDatabase ?: string,
}

type SQLBusinessOptions = {
    table ?: string,
    filter ?: string,
    appliesTo ?: string,
    showSystemItems ?: string,
    schema ?: string,
    query ?: string,
    mode ?: string,
    maxRows ?: string,
    moreLessToggle  ?: string,
    dialect ?: string,
    showRowNum  ?: string,
}

type SQLValidationOptions = {
    rowCount ?: string,
}


