import NotificationMixin from './NotificationMixin';
import { formatDateTime } from '../utils/dates';

export default {
  mixins: [NotificationMixin],
  methods: {
    formatDateTime,
    onCreated(item) {
      this.showMessage(`${item['@id']} created`);
      let folderParams = this.$route.query;

      this.$router.push({
        name: `${this.$options.servicePrefix}Update`,
        params: { id: item['@id'] },
        query: folderParams
      });
    },
    onSendForm() {
      const createForm = this.$refs.createForm;
      createForm.$v.$touch();
      if (createForm.$v.item.parentResourceNode) {
        let nodeId = this.$route.params.node;
        createForm.$v.item.$model.parentResourceNode = '/api/resource_nodes/' + nodeId;
      }

      if (!createForm.$v.$invalid) {
        this.create(createForm.$v.item.$model);
      }
    },
    resetForm() {
      this.$refs.createForm.$v.$reset();
      this.item = {};
    }
  },
  watch: {
    created(created) {
      if (!created) {
        return;
      }

      this.onCreated(created);
    },

    error(message) {
      message && this.showError(message);
    }
  }
};