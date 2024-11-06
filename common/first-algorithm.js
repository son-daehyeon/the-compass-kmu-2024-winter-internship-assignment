function friendRecommendations(network, user) {
  const recommendations = new Set();

  const myFriends = new Set(network[user]);

  const queue = [user];
  const visited = new Set([user]);

  while (queue.length > 0) {
    const person = queue.shift();

    for (const other of network[person]) {
      if (visited.has(other)) continue;

      queue.push(other);
      visited.add(other);

      if (myFriends.has(other)) continue;

      recommendations.add(other);
    }
  }

  return Array.from(recommendations);
}
