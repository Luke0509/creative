var app = new Vue({
  el: '#app',
  data: {
    user: null,
    addedDate: '',
    addedEntry: '',
    addedTitle: '',
    entries: {},
  },
  created(){
    this.getEntries();
    //this.getUser();
  },
  methods: {
    async getEntries() {
      try{
        let response = await axios.get("/api/entries");
        this.entries = response.data;
      } catch (error){
        console.log(error);
      }
    },
    async addEntry() {
      try{
        let response = await axios.post("/api/entries",{
          date: this.addedDate,
          title: this.addedTitle,
          entry: this.addedEntry
        });
        this.addedDate = "";
        this.addedEntry = "";
        this.addedTitle = "";
        this.getEntries();
      }
      catch(error){
        console.log(error);
      }
    },
    async deleteEntry(entry) {
      try {
        let response = await axios.delete("/api/entries/" + entry._id);
        this.getEntries();
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
  },
});
