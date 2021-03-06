﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace KYHBPA
{
    [Table("DocumentCollection", Schema = "Document")]
    public class DocumentCollection
    {
        public DocumentCollection() {}

        public DocumentCollection(string key, IEnumerable<Document> collection, int maximumCollectionSize = 1)
        {
            this.Key = key ?? throw new ArgumentNullException(nameof(key));
            this.Collection = collection?.ToList() ?? throw new ArgumentNullException(nameof(collection));
            this.CollectionSize = this.Collection.Count(o => !o.IsDeleted && o.DocumentCollectionKey == key);
            if (maximumCollectionSize <= 0)
                maximumCollectionSize = 1;
            this.MaximumCollectionSize = maximumCollectionSize;
        }

        [Key, Required]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Key { get; set; }

        [Column(Order = 1)]
        public int MaximumCollectionSize { get; set; }

        [Column(Order = 2)]
        public int CollectionSize
        {
            get => Collection?.Count ?? 0;
            private set { /* needed for EF */ }
        }

        public ICollection<Document> Collection { get; private set; }
    }
}