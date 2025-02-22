function findKey(obj, targetKey, path = 'obj') {
  for (const key in obj) {
	const currentPath = `${path}["${key}"]`;
	if (key === targetKey) console.log(currentPath);
	if (typeof obj[key] === 'object') this.findKey(obj[key], targetKey, currentPath);
  }
}
