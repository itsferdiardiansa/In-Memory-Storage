# In-Memory Custom Storage

This project aims to develop an in-memory storage solution, which is a fast and efficient temporary data storage system. This in-memory storage stores data in the main memory (RAM), allowing faster access compared to disk storage. This solution is ideal for applications requiring high performance and low latency, such as data caching, real-time data processing, or testing applications without involving a permanent database.

![diagram-export-23-10-2024-14_19_08.png](https://eraser.imgix.net/workspaces/kdq8fSOE8M23EBUYMbFW/2XG2BGojRDZ1XQRU8zKzU21QVJH3/hvs5a2jIUjaqHsMVy5qDL.png?ixlib=js-3.7.0 "diagram-export-23-10-2024-14_19_08.png")

The main features implemented in this project include:

1. **CR Operations**: Supports Create and Read operations to efficiently manage stored data.
2. **Flexible Data Structures**: Allows the use of different data structures, such as hash maps, lists, sets, or B+ trees with fast search capabilities, to meet the needs of various types of applications.
3. **Data Security**: Provides mechanisms for secure access and controlled data deletion to prevent leaks or unauthorized use of data.
4. **Expansion and Scalability**: Enables storage capacity management with automatic eviction of irrelevant or outdated data.
5. **Performance Optimization**: Designed to minimize access time and maximize throughput, making it highly efficient for high-load applications.
This project is suitable for various scenarios, such as storing user session data, caching query results to reduce the load on the main database, or serving as a buffer for batch data processing. With an in-memory approach, applications can respond to requests more quickly, enhancing user experience and overall system efficiency.

### **Built with:**

- [﻿Typescript](https://www.typescriptlang.org/)
- [﻿Nx](https://nx.dev/)
- [﻿PNPM](https://pnpm.io/)
- [﻿NestJS](https://nestjs.com/)
- [﻿Jest](https://jestjs.io/)

## Development

To develop and run the project locally, you will need:

- Node: >= 18
- pnpm: >= 7.4.0

### **Installation**

Installing the dependencies is done via pnpm:

```
﻿pnpm install
```

This will install all dependencies for the packages and apps within the workspace.

### **Run development server and try the API**

```
pnpm run start:api
```

This will launch in a port [﻿http://localhost:5763](http://localhost:5763/)

- Next, use [﻿Postman](https://www.postman.com/)﻿ to explore apis.
- Download [﻿this collections](https://api.postman.com/collections/1158990-ddafecb9-6894-4ea6-9c50-d5ce02825dc4?access_key=PMAT-01HNGTQRXWNNRY7XMNZCABE3F5)﻿ and import to your Postman.

### **Test**

```
pnpm run test
```
