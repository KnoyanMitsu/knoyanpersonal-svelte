import axios from 'axios';

export default class Language {
	constructor(name, api) {
		this.statsJson = [];
		this.totalJson = [];
		this.api = api;
		this.name = name;
	}

	// Define method inside class without "function"
	async fetchGithubLanguageStats(username, token) {
		// GraphQL query
		const query = `
            query($username: String!) {
                user(login: $username) {
                    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                        nodes {
                            name
                            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                    size
                                    node {
                                        color
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

		try {
			// Make GraphQL request
			const response = await axios({
				url: 'https://api.github.com/graphql',
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`
				},
				data: {
					query,
					variables: {
						username
					}
				}
			});

			const data = response.data.data.user.repositories.nodes;
			// Menghitung total dan jumlah per bahasa
			const languageCounts = data.reduce(
				(acc, repo) => {
					if (repo.languages && repo.languages.edges) {
						repo.languages.edges.forEach((edge) => {
							const langName = edge.node.name;
							const langColor = edge.node.color;

							// Initialize language object if it doesn't exist
							if (!acc.counts[langName]) {
								acc.counts[langName] = {
									count: 0,
									color: langColor,
									size: 0
								};
							}

							acc.counts[langName].count += 1;
							acc.counts[langName].size += edge.size;
							acc.total += 1;
							acc.totalSize += edge.size;
						});
					}
					return acc;
				},
				{ counts: {}, total: 0, totalSize: 0 }
			);

			// Calculate percentages and create results array
			const languageStats = Object.entries(languageCounts.counts)
				.map(([language, data]) => ({
					language,
					count: data.count,
					color: data.color,
					size: data.size,
					percentage: ((data.count / languageCounts.total) * 100).toFixed(1),
					sizePercentage: ((data.size / languageCounts.totalSize) * 100).toFixed(1)
				}))
				.sort((a, b) => b.count - a.count);

			// Format for display
			const formattedStats = languageStats.map((stat) => ({
				language: stat.language,
				count: `${stat.count} repos`,
				percentage: `${stat.percentage}%`,
				sizePercentage: `${stat.sizePercentage}%`,
				color: stat.color,
				bar: '█'.repeat(Math.round(stat.percentage / 2))
			}));

			return {
				raw: languageStats,
				formatted: formattedStats,
				totals: {
					repositories: data.length,
					languageInstances: languageCounts.total,
					totalSize: languageCounts.totalSize
				}
			};
		} catch (error) {
			console.error('Error fetching GitHub data:', error.response?.data || error.message);
			throw error;
		}
	}
	async GetStats() {
		const token = this.api;
		const username = this.name;

		const languageInstance = new Language(); // Create an instance of the class

		try {
			const stats = await languageInstance.fetchGithubLanguageStats(username, token);
			this.statsJson = stats.formatted;
			this.totalJson = stats.totals;
			return stats.formatted;
		} catch (error) {
			console.error('Failed to fetch statistics:', error.message);
		}
	}
}
