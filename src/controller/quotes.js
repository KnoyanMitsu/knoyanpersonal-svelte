import axios from 'axios';

export default class Quotes {
    async fecthQuotes() {
        try {
            const response = await axios.get('https://dummyjson.com/quotes');
            return response.data;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            throw error;
        }
    }

    async GetQuotes() {
        try {
            const quotes = await this.fecthQuotes();
            let randomIndex = Math.floor(Math.random() * quotes.quotes.length);
            let results = quotes.quotes[randomIndex].quote + ' - ' + quotes.quotes[randomIndex].author;
            return results;
        } catch (error) {
            console.error('Failed to fetch quotes:', error.message);
        }
    }

    
}