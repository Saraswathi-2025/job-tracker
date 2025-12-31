import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch jobs
  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data?.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load saved jobs
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs"));
    if (stored) setSavedJobs(stored);
  }, []);

  function saveJob(job) {
    if (savedJobs.some((j) => j.id === job.id)) return;
    const updated = [...savedJobs, job];
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  }

  function removeJob(id) {
    const updated = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  }

  const filteredJobs = jobs.filter((job) => {
    const title = job?.title?.toLowerCase() || "";
    const location = job?.candidate_required_location?.toLowerCase() || "";
    const type = job?.job_type || "";

    const matchSearch = title.includes(search.toLowerCase());
    const matchType = typeFilter === "all" || type === typeFilter;
    const matchLocation =
      locationFilter === "all" || location.includes(locationFilter);

    return matchSearch && matchType && matchLocation;
  });

  return (
    <div className="container">
      <h1 className="title">Job Tracker</h1>

      {/* CONTROLS */}
      <div className="controls">
        <input
          className="search"
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="full_time">Full Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>

        <select
          className="filter"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="worldwide">Worldwide</option>
          <option value="usa">USA</option>
          <option value="europe">Europe</option>
          <option value="germany">Germany</option>
          <option value="india">India</option>
        </select>
      </div>

      {loading && <p className="loading">Loading jobs...</p>}

      {/* JOB LIST */}
      <div className="jobs">
        {!loading &&
          filteredJobs.map((job) => {
            const isSaved = savedJobs.some((j) => j.id === job.id);

            return (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>

                <p><strong>Company:</strong> {job.company_name || "N/A"}</p>
                <p><strong>Location:</strong> {job.candidate_required_location || "N/A"}</p>
                <p><strong>Type:</strong> {job.job_type || "N/A"}</p>

                <div className="actions">
                  <a
                    className="btn btn-link"
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apply
                  </a>

                  <button
                    className="btn btn-primary"
                    disabled={isSaved}
                    onClick={() => saveJob(job)}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* SAVED JOBS */}
      <h2 className="subtitle">Saved Jobs</h2>

      {savedJobs.length === 0 && (
        <p className="empty">No saved jobs yet.</p>
      )}

      <div className="jobs">
        {savedJobs.map((job) => (
          <div className="job-card saved" key={job.id}>
            <h3>{job.title}</h3>

            <p><strong>Company:</strong> {job.company_name}</p>
            <p><strong>Location:</strong> {job.candidate_required_location}</p>

            <div className="actions">
              <a
                className="btn btn-link"
                href={job.url}
                target="_blank"
                rel="noreferrer"
              >
                Apply
              </a>

              <button
                className="btn btn-danger"
                onClick={() => removeJob(job.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;