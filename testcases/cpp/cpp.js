export function formatCpp(
    testcases,
    metadata
) {
    const json = JSON.parse(testcases);
    testcases = json.map(([arr, num]) => [
        JSON.parse(arr),
        JSON.parse(num)
    ]);

    metadata = JSON.parse(metadata);

    console.dir(testcases);
    console.dir(metadata);

    return testcases;
}
