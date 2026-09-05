package com.RealTimeCollaboration.RealTime.model.file;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table (name = "metaData")
public class fileMetaData {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileId;
    private String roomCode;
    private String fileName;
    private long fileSize;
    private Integer totalChunks;
    private String uploadBy;
    private Boolean uploadComplete;
    private String storagePath;

}
