import express from 'express';

export interface FileUploadRequest extends express.Request {
    files: any;
}